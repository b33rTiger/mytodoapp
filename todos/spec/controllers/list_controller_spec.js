var request = require('supertest'),
 bcrypt = require('bcrypt-nodejs'),
 app = require('../../app').app;

var Board = require('../../app/models/board'),
 Member = require('../../app/models/member'),
 List = require('../../app/models/list'),
 Todo = require('../../app/models/todo');

   var authenticate = {};
   var board;
   var member;
   var list;
   var todo;

describe ('ListController', function() {

 describe('with data', function() {

beforeAll(function (done) {
  var password = 'whatWhat',
  salt = bcrypt.genSaltSync(10),
  hash = bcrypt.hashSync(password, salt),
  password2 = 'testpass',
  salt = bcrypt.genSaltSync(10),
  hash2 = bcrypt.hashSync(password2, salt);

  Member.create({
    name: 'testuser3',
    password: hash2,
    email: 'testuser3@mail.com'
  }, function (error, testUser) {
    if (error) {
      done.fail(error);
    } else {
      user = testUser;
      Member.create({
        name: 'newmember3',
        password: hash,
        email: 'beerGutter3@mail.com'
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
        name: 'testboard2'
      }, function (error, newBoard) {
        if (error) {
          done.fail(error);
        } else {
          board = newBoard
          List.create({
            _board: board._id,
            name: 'testlist2'
          }, function (error, newList) {
            if (error) {
              done.fail(error);
            } else {
              list = newList;
              Todo.create({
                _list: list._id,
                item: 'testitem2'
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

//    //Test for showing a list
   it('should show an existing list', function (done) {
     request(app)
     .get('/api/lists?boardId='+board._id)
     .set('X-ACCESS-TOKEN', authenticate.token)
     .expect('Content-Type', /json/)
     .expect(200)
     .end(function (error, res){
       if (error) {
         done.fail(error);
       } else {
         expect(res.body.length).toEqual(1);
         returnedList = res.body[0];
         expect(returnedList.name).toBe('testlist2');
         done();
       }
     })
   })

    //Test for creating a new list
    it('should create a new list', function (done) {
     request(app)
     .post('/api/lists')
     .set('X-ACCESS-TOKEN', authenticate.token)
     .send({
       name: 'testListCreate',
       _board: board._id
     })
     .end(function (error, res) {
       if (error) {
         done.fail(error);
       } else {
         returnedList = res.body;
         expect(returnedList.name).toBe('testListCreate');
         List.findOne({name: 'testListCreate'})
         .remove(function (error) {
           done();
         })
       }
     })
    })

   //Test for deleting an existing list
   it('should delete an existing list', function (done) {
    var list_id = list._id;
     request(app)
     .post('/api/delete/list/'+list_id)
     .set('X-ACCESS-TOKEN', authenticate.token)
     .end(function (error, res) {
       if (error) {
         done.fail(error);
       } else {
         List.findOne({ _id: list_id})
         .remove(function (error) {
           List.findOne({ _id: list_id}, function (error, list) {
             if (error) {
               done.fail(error);
             } else {
               expect(list).toBeNull()
               done();
             }
           })
         })
       }
     })
   })

 })
})

//Login the test user
function loginUser(authenticate, done) {
  request(app)
  .post('/authenticate')
  .send({
      email: 'beerGutter3@mail.com',
      password: 'whatWhat'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
      authenticate.token = res.body.token;
      done();
  }
}