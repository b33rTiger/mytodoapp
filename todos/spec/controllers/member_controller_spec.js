var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

//model
var Member = require ('../../app/models/member');

//variables
var authenticate = {};
var member;
var user;

beforeAll(function (done) {
  var password = 'whatWhat',
  salt = bcrypt.genSaltSync(10),
  hash = bcrypt.hashSync(password, salt),
  password2 = 'testpass',
  salt = bcrypt.genSaltSync(10),
  hash2 = bcrypt.hashSync(password2, salt);

  Member.create({
    name: 'testuser',
    password: hash2,
    email: 'testuser@mail.com'
  }, function (error, testUser) {
    if (error) {
      done.fail(error);
    } else {
      user = testUser;
      Member.create({
        name: 'newmember',
        password: hash,
        email: 'beerGutter@mail.com'
      }, function (error, newMember) {
        if (error) {
          done.fail(error);
        } else {
          member = newMember;
          loginUser(authenticate, done);
          }
      });
    }
  })
});

afterAll(function (done) {
  Member.remove({_id: member._id}, function (error, removedUser) {
    if (error) {
      done.fail(error);
    } else {
      done();
    }
  });
});

describe ('MemberController', function() {

    describe('with data', function() {

      afterEach(function (done) {
        Member.remove({name: 'testuser'}, function (error, removedMember) {
          if (error) {
            done.fail(error);
          } else {
            done();
          }
        })
      });

        //Test for showing existing member
        it('should return an existing member', function (done) {
            var memberId = member._id;
            request(app)
            .get('/api/members/show/'+memberId)
            .set('X-ACCESS-TOKEN', authenticate.token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    expect(res.body.length).toEqual(1);
                    returnedMember = res.body[0];
                    expect(returnedMember.name).toBe('newmember');
                    done();
                }
            });
        });

        // Test for creating a new user
        it('should create a new user', function (done) {
            request(app).post('/api/members/signup')
            .send({
                name: 'testbeer',
                password: 'beer',
                email: 'beer@beery.com'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    returnedMember = res.body;
                    expect(returnedMember.name).toBe('testbeer');
                    Member.findOne({ name:'testbeer'})
                    .remove(function (error){
                        done();
                    })
                }
            });
        });

        //Test for deleting a new user
        it('should delete an existing user', function (done) {
            var memberId = member._id;
            request(app)
            .post('/api/delete/member/'+memberId)
            .set('X-ACCESS-TOKEN', authenticate.token)
            .end(function (err, res){
              if (err) {
                done.fail(err);
              } else {
                Member.findOne({ _id: member._id})
                .remove(function (error){
                  Member.findOne({ _id: member._id}, function (err, member){
                    if (err) {
                        done.fail(err);
                    } else {
                        expect(member).toBeNull()
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
      email: 'beerGutter@mail.com',
      password: 'whatWhat'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
      authenticate.token = res.body.token;
      done();
  }
}