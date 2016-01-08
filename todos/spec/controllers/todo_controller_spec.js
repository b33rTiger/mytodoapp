var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

var Todo = require ('../../app/models/todo'),
  Member = require('../../app/models/member'),
  Board = require('../../app/models/board'),
  List = require('../../app/models/list');

  var authenticate = {};
  var member;
  var board;
  var todo;
  var list;

describe ('TodoController', function() {

  describe('with data', function() {

    beforeAll(function (done) {
      var password = 'whatWhat',
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt),
      password2 = 'testpass',
      salt = bcrypt.genSaltSync(10),
      hash2 = bcrypt.hashSync(password2, salt);

      Member.create({
        name: 'testuser4',
        password: hash2,
        email: 'testuser4@mail.com'
      }, function (error, testUser) {
        if (error) {
          done.fail(error);
        } else {
          user = testUser;
          Member.create({
            name: 'newmember4',
            password: hash,
            email: 'beerGutter4@mail.com'
          }, function (error, newMember) {
            if (error) {
              done.fail(error);
            } else {
              member = newMember;
              loginUser(authenticate, done);
              }
          });
        }
      });
    });

    beforeEach(function (done){
      Board.create({
        owner: user._id,
        name: 'testboard3'
      }, function (error, newBoard) {
        if (error) {
          done.fail(error);
        } else {
          board = newBoard
          List.create({
            _board: board._id,
            name: 'testlist3'
          }, function (error, newList) {
            if (error) {
              done.fail(error);
            } else {
              list = newList;
              Todo.create({
                _list: list._id,
                item: 'testitem3'
              }, function (error, newTodo) {
                if (error) {
                  done.fail(error);
                } else {
                  todo = newTodo;
                  done();
                }
              })
            }
          });
        }
      });
     });

   afterEach(function (done){
    Todo.remove({_list: list._id}, function (error, removedTodo) {
      if (error) {
        done.fail(error);
      } else {
         List.remove({_board: board._id}, function (error, removedList) {
           if (error) {
             done.fail(error);
           } else {
             Board.remove({owner: user._id}, function (error, removedBoard) {
               if (error) {
                 done.fail(error);
               } else {
                 Member.remove({_id: user._id}, function (error, removedMember) {
                   done();
                 })
               }
            })
          }
         })
       }
     })
   });

        //Test for creating a new todo item
        it('should create a new todo', function (done) {
            request(app)
            .post('/api/todos')
            .set('X-ACCESS-TOKEN', authenticate.token)
            .send({
              listId: list._id,
              item: 'testingTodo2'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (error, res){
                if (error) {
                    done.fail(err);
                } else {
                    returnedTodo = res.body;
                    expect(returnedTodo.item).toBe('testingTodo2');
                    Todo.findOne({ item:'testingTodo2'})
                    .remove(function (error){
                        done();
                    })
                }
            });
        });

        //Test for deleting an existing todo
        it('should delete an existing todo', function (done) {
            request(app).post('/api/delete/'+todo._id)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    Todo.findOne({ _id: todo._id})
                    .remove(function (error){
                        Todo.findOne({ _id: todo._id}, function (err,todo){
                            if (err) {
                                done.fail(err);
                            } else {
                                expect(todo).toBeNull()
                                done();
                            }
                        })
                    })
                }
            });
        });
    });
});

//Login the test user
function loginUser(authenticate, done) {
  request(app)
  .post('/authenticate')
  .send({
      email: 'beerGutter4@mail.com',
      password: 'whatWhat'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
      authenticate.token = res.body.token;
      done();
  }
}