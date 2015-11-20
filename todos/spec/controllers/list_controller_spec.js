// var request = require('supertest'),
//  app = require('../../app').app;

// var Board = require('../../app/models/board'),
//  Member = require('../../app/models/member'),
//  List = require('../../app/models/list');

// describe ('ListController', function() {

//  describe('with data', function() {
//    var board;
//    var member;
//    var list;

//    beforeEach(function (done){
//      Member.create({
//        name: 'testMemberforList',
//        password: 'passy',
//        email: 'test@list.com'
//      }, function (error, newMember) {
//        if (error) {
//          console.log(error);
//          done.fail(error);
//        } else {
//          member = newMember;
//          Board.create({
//            owner: member._id,
//            name: 'testBoard'
//          }, function (err, newBoard) {
//            if (err) {
//              console.log(err);
//              done.fail(err);
//            } else {
//              board = newBoard
//              List.create({
//                _board: board._id,
//                name: 'testListForBoard'
//              }, function (e, newList) {
//                if (e) {
//                  console.log(e);
//                  done.fail(e);
//                } else {
//                  list = newList;
//                  done();
//                }
//              })
//            }
//          })
//        }
//      })
//    })

//    afterEach(function (done){
//      List.remove({_board: board._id}, function (e, removedList) {
//        if (e) {
//          done.fail(e);
//        } else {
//          Board.remove({owner: member._id}, function (err, removedBoard) {
//            if (err) {
//              done.fail(err);
//            } else {
//              Member.remove({_id: member._id}, function (error, removedMember) {
//                done();
//              });
//            }
//          })

//        }
//      })
//    });

// //    //Test for showing a list
//    it('should show an existing list', function (done) {
//      request(app).get('/api/lists')
//      .expect('Content-Type', /json/)
//      .expect(200)
//      .end(function (err, res){
//        if (err) {
//          done.fail(err);
//        } else {
//          console.log(res.body);
//          expect(res.body.length).toEqual(1);
//          returnedList = res.body[0];
//          expect(returnedList.name).toBe('testListForBoard');
//          done();
//        }
//      })
//    })

//     //Test for creating a new list
//     it('should create a new list', function (done) {
//      request(app).post('/api/lists')
//      .send({
//        name: 'testListCreate',
//        _board: 'testBoard'
//      })
//      // .expect('Content-Type', /json/)
//      // .expect(200)
//      .end(function (err, res) {
//        if (err) {
//          done.fail(err);
//        } else {
//          returnedList = res.body;
//          expect(returnedList.name).toBe('testListCreate');
//          List.findOne({name: 'testListCreate'})
//          .remove(function (error) {
//            done();
//          })
//        }
//      })
//     })

//    //Test for deleting an existing list
//    it('should delete an existing list', function (done) {
//     var list_id = list._id;
//      request(app).post('/api/delete/list/'+list_id)
//      .end(function (err, res) {
//        if (err) {
//          done.fail(err);
//        } else {
//          List.findOne({ _id: list_id})
//          .remove(function (error) {
//            List.findOne({ _id: list_id}, function (err, list) {
//              if (err) {
//                done.fail(err);
//              } else {
//                expect(list).toBeNull()
//                done();
//              }
//            })
//          })
//        }
//      })
//    })

//  })
// })