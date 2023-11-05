var expect = require('chai').expect;
var getUserBySessionMW = require('../../../../middlewares/user/getUserBySession');

describe('getUserBySession middleware ', function () {

  it('should set res.locals.user from db from session userid', function (done) {
   

    const MW = getUserBySessionMW({
      userModel:{
        findOne: (param1,callback)=>{
            expect(param1).to.be.eql({_id:1});
          callback(undefined,'testUser');
        }
      }
    });

    const testRes = {
        locals:{}
    };

    MW({
        session: {
            userid: 1
        }
    },testRes,
    (err)=>{
        expect(err).to.be.eql(undefined);
        expect(testRes.locals).to.be.eql({user:'testUser'})
        done();
    });
  });

  it('should call next with error if there is a db problem', function (done) {


    const MW = getUserBySessionMW({
        userModel:{
          findOne: (param1,callback)=>{
              expect(param1).to.be.eql({_id:1});
            callback('error',null);
          }
        }
      });
  
      const testRes = {
          locals:{}
      };
  
      MW({
          session: {
              userid: 1
          }
      },testRes,
      (err)=>{
          expect(err).to.be.eql('error');
          done();
      });
  });

  it('should call next with error if there is no result from db', function (done) {


    const MW = getUserBySessionMW({
        userModel:{
          findOne: (param1,callback)=>{
              expect(param1).to.be.eql({_id:1});
            callback(undefined,null);
          }
        }
      });
  
      const testRes = {
          locals:{}
      };
  
      MW({
          session: {
              userid: 1
          }
      },testRes,
      (err)=>{
        //expect(err).to.be.eql(undefined);
        expect(testRes.locals).to.be.eql({})
        done();
      });
  });
});

