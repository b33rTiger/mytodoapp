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

beforeAll(function (done) {
  var password = 'whatWhat',
  salt = bcrypt.genSaltSync(10),
  hash = bcrypt.hashSync(password, salt),
  password2 = 'testpass',
  salt = bcrypt.genSaltSync(10),
  hash2 = bcrypt.hashSync(password2, salt);

  Member.create({
    name: 'testuser2',
    password: hash2,
    email: 'testuser2@mail.com'
  }, function (error, testUser) {
    if (error) {
      done.fail(error);
    } else {
      user = testUser;
      Member.create({
        name: 'newmember2',
        password: hash,
        email: 'beerGutter2@mail.com'
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


afterAll(function (done) {
  Member.remove({_id: member._id}, function (error, removedMember) {
    if (error) {
      done.fail(error);
    } else {
      done();
    }
  });
});


describe ('BoardController', function() {

  describe('with data', function() {

    beforeEach(function (done){
      Board.create({
        owner: user._id,
        name: 'testboard'
      }, function (error, newBoard) {
        if (error) {
          done.fail(error);
        } else {
          board = newBoard
          List.create({
            _board: board._id,
            name: 'testlist'
          }, function (error, newList) {
            if (error) {
              done.fail(error);
            } else {
              list = newList;
              Todo.create({
                _list: list._id,
                item: 'testitem'
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

//    //Test for showing a board
   it('should show an existing board', function (done) {
    var ownerId = user._id;
     request(app)
     .get('/api/boards/'+ownerId)
     .set('X-ACCESS-TOKEN', authenticate.token)
     .expect('Content-Type', /json/)
     .expect(200)
     .end(function (error, res){
       if (error) {
         done.fail(error);
       } else {
         expect(res.body.length).toEqual(1);
         returnedBoard = res.body[0];
         expect(returnedBoard.name).toBe('testboard');
         done();
       }
     })
   })

    //Test for creating a new board
    it('should create a new board', function (done) {
     var ownerId = member._id;
     request(app)
     .post('/api/boards')
     .set('X-ACCESS-TOKEN', authenticate.token)
     .send({
       ownerId: ownerId,
       name: 'testBoardCreate'
     })
     .end(function (error, res) {
       if (error) {
         done.fail(error);
       } else {
         returnedBoard = res.body;
         expect(returnedBoard.name).toBe('testBoardCreate');
         Board.findOne({name: 'testBoardCreate'})
         .remove(function (error) {
           done();
         })
       }
     })
    })

   //Test for deleting an existing board
   it('should delete an existing board', function (done) {
    var ownerId = user._id;
     request(app)
     .post('/api/board/delete/'+ownerId)
     .set('X-ACCESS-TOKEN', authenticate.token)
     .end(function (err, res) {
       if (err) {
         done.fail(err);
       } else {
         Board.findOne({ owner: ownerId})
         .remove(function (error) {
           Board.findOne({ owner: ownerId}, function (err, board) {
             if (err) {
               done.fail(err);
             } else {
               expect(board).toBeNull()
               done();
             }
           })
         })
       }
     })
   })

//    //Test for updating a board
//    it('should update an existing board', function (done) {
//      request(app).post('/api/boards/edit/'+board._id)
//      .send({
//        name: 'updatedBoard'
//      })
//      .end(function (err,res) {
//        if (err) {
//          done.fail(err);
//        } else {
//          returnedBoard = res.body[res.body.length-1];
//          expect(returnedBoard.name).toBe('updatedBoard');
//          Board.findOne({ name: 'updatedBoard'})
//          done();
//        }
//      })
//    })
 })
})

//Login the test user
function loginUser(authenticate, done) {
  request(app)
  .post('/authenticate')
  .send({
      email: 'beerGutter2@mail.com',
      password: 'whatWhat'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
      authenticate.token = res.body.token;
      done();
  }
}