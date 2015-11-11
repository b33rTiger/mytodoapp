var request = require('supertest'),
  app = require('../../app').app;

  var Todo = require('../../app/models/todo');

  describe ('TodoController', function() {
    describe('with no data', function() {
      it('should return an empty list', function (done) {
        request(app).get('/api/todos')
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
      var todo;

      beforeEach(function (done) {
        Todo.save({item: 'test todo'}, function (err, newTodo) {
          if (err) {
            console.log(err);
            done.fail(err);
          } else {
            console.log(newTodo);
            todo = newTodo;
            done();
          }
        });
      });

      it('should return 1 todo', function (done) {
        request(app).get('/api/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done.fail(err);
          } else {
            expect(res.body.length).toEqual(1);
            returnedTodo = res.body[0];
            expect(returnedTodo.item).toEqual(todo.item);
            done();
          }
        });
      });

      afterEach(function (done) {
        todo.remove(function (err, removedTodo) {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
      });
    });
  });


