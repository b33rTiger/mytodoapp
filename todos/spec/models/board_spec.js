var request = require('supertest'),
  app = require('../../app').app;

  var Board = require('../../app/models/board');

  describe ('BoardController', function() {
    describe('with no data', function() {
      it('should return an empty board', function (done) {
        request(app).get('/api/boards')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([]);
            done();
          }
        });
      });
    });

    describe('with data', function() {
      var board;

      beforeEach(function (done) {
        Board.save({name: 'test board', description: 'test board description'}, function (err, newBoard) {
          if (err) {
            console.log(err);
            done.fail(err);
          } else {
            console.log(newBoard);
            board = newBoard;
            done();
          }
        });
      });

      it('should return 1 board', function (done) {
        request(app).get('/api/boards')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done.fail(err);
          } else {
            expect(res.body.length).toEqual(1);
            returnedBoard = res.body[0];
            expect(returnedBoard.name).toEqual(board.name);
            done();
          }
        });
      });

      afterEach(function (done) {
        board.remove(function (err, removedBoard) {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
      });
    });
  });


