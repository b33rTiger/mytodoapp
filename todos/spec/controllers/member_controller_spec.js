// var request = require('supertest'),
//     bcrypt = require('bcrypt-nodejs'),
//     app = require('../../app').app;

// //model
// var Member = require ('../../app/models/member');

// //variables
// var auth = {};

// beforeAll(loginUser(auth));

// describe ('MemberController', function() {

//     describe('with data', function() {
//         var member;

//         beforeEach(function (done) {
//             Member.create({
//                 name: 'tester',
//                 password: 'testpass',
//                 email: 'test@mail.com'
//             }, function (err, newMember) {
//                 if (err) {
//                     console.log(err);
//                     done.fail(err);
//                 } else {
//                     member = newMember;
//                     done();
//                 }
//             });
//         });

//         afterEach(function (done) {
//             member.remove(function (err, removedMember) {
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                   done();
//                 }
//             });
//         });

//         //Test for showing existing member
//         it('should return an existing member', function (done) {
//             var memberId = member._id;
//             request(app)
//             .get('/api/members/show/'+memberId)
//             .set('X-ACCESS-TOKEN', auth.token)
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function (err, res){
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     expect(res.body.length).toEqual(1);
//                     returnedMember = res.body[0];
//                     expect(returnedMember.name).toBe('tester');
//                     done();
//                 }
//             });
//         });

//         // Test for creating a new user
//         it('should create a new user', function (done) {
//             request(app).post('/api/members/signup')
//             .send({
//                 name: 'testbeer',
//                 password: 'beer',
//                 email: 'beer@beery.com'
//             })
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function (err, res){
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     returnedMember = res.body;
//                     expect(returnedMember.name).toBe('testbeer');
//                     Member.findOne({ name:'testbeer'})
//                     .remove(function (error){
//                         done();
//                     })
//                 }
//             });
//         });

//         //Test for deleting a new user
//         it('should delete an existing user', function (done) {
//             var memberId = member._id;
//             request(app)
//             .post('/api/delete/member/'+memberId)
//             .set('X-ACCESS-TOKEN', auth.token)
//             .end(function (err, res){
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     Member.findOne({ _id: member._id})
//                     .remove(function (error){
//                         Member.findOne({ _id: member._id}, function (err, member){
//                             if (err) {
//                                 done.fail(err);
//                             } else {
//                                 expect(member).toBeNull()
//                                 done();
//                             }
//                         })
//                     })
//                 }
//             });
//         });

//     });
// });

// //****NOTE: In order for this function to work, you have to manually make that account.
// function loginUser(auth) {
//     return function (done) {
//         request(app)
//         .post('/api/authenticate')
//         .send({
//             email: 'beerGutter@mail.com',
//             password: 'beerbeer'
//         })
//         .expect(200)
//         .end(onResponse);

//         function onResponse(err, res) {
//             auth.token = res.body.token;
//             return done();
//         }
//     }
//     return done();
// }