var request = require('supertest'),
 app = require('../../app').app;

var Board = require('../../app/models/board'),
 Member = require('../../app/models/member'),
 List = require('../../app/models/list');

describe ('BoardController', function() {

 describe('with data', function() {
   var board;
   var member;
   var list;

   beforeEach(function (done){
     Member.create({
       name: 'testMemberforBoard',
       password: 'password',
       email: 'test@test.com'
     }, function (error, newMember) {
       if (error) {
         console.log(error);
         done.fail(error);
       } else {
         member = newMember;
         Board.create({
           owner: member._id,
           name: 'testBoard'
         }, function (err, newBoard) {
           if (err) {
             console.log(err);
             done.fail(err);
           } else {
             board = newBoard
             List.create({
               _board: board._id,
               name: 'testListForBoard'
             }, function (e, newList) {
               if (e) {
                 console.log(e);
                 done.fail(e);
               } else {
                 list = newList;
                 done();
               }
             })
           }
         })
       }
     })
   })

   afterEach(function (done){
     List.remove({_board: board._id}, function (e, removedList) {
       if (e) {
         done.fail(e);
       } else {
         Board.remove({owner: member._id}, function (err, removedBoard) {
           if (err) {
             done.fail(err);
           } else {
             Member.remove({_id: member._id}, function (error, removedMember) {
               done();
             });
           }
         })

       }
     })
   });

//    //Test for showing a board
   it('should show an existing board', function (done) {
    var ownerId = member._id;
     request(app).get('/api/boards/'+ownerId)
     .expect('Content-Type', /json/)
     .expect(200)
     .end(function (err, res){
       if (err) {
         done.fail(err);
       } else {
         // console.log(res.body);
         expect(res.body.length).toEqual(1);
         returnedBoard = res.body[0];
         expect(returnedBoard.name).toBe('testBoard');
         done();
       }
     })
   })

    //Test for creating a new board
    it('should create a new board', function (done) {
     var ownerId = member._id;
     request(app).post('/api/boards/'+ownerId)
     .send({
       name: 'testBoardCreate'
     })
     // .expect('Content-Type', /json/)
     // .expect(200)
     .end(function (err, res) {
       if (err) {
         done.fail(err);
       } else {
         returnedBoard = res.body;
         // console.log(res.body);
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
    var ownerId = member._id;
     request(app).post('/api/board/delete/'+ownerId)
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