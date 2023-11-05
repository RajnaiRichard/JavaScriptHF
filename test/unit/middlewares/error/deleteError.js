var expect = require('chai').expect;
var deleteErrorMW = require('../../../../middlewares/error/deleteError');

describe('deleteError middleware ', function () {

  it('should delete errors', function (done) {

    const testErrorResult= {
      remove:(callback)=>{
        callback(undefined);
      }
    }
    const MW = deleteErrorMW({
      errorModel:{
        findOne: (param1,callback)=>{
          expect(param1).to.be.eql({_id:1});
          
          callback(undefined,testErrorResult)
        }
      }
    });

    MW({
      params: {errorid:1}
    },{
      redirect:(destination)=>{
        done();
      }
    },()=>{
      
    });
  });

  it('should do nothing if errorid is missing', function (done) {

    const MW = deleteErrorMW({
      errorModel:{}
    });

    MW({
      params: {errorid:''}
    },{
    },(err)=>{
      expect(err).to.be.eql(undefined);
      done();
    });
  });

  it('should call next with error if there is a db problem', function (done) {

    const MW = deleteErrorMW({
      errorModel:{
        findOne: (param1,callback)=>{
          expect(param1).to.be.eql({_id:1});
          
          callback('error','testErrorResult')
        }
      }
    });

    MW({
      params: {errorid:1}
    },{},
    (err)=>{
      expect(err).to.be.eql('error');
      done();
    });
  });

  it('should call next with error if there is no result from db', function (done) {

    const MW = deleteErrorMW({
      errorModel:{
        findOne: (param1,callback)=>{
          expect(param1).to.be.eql({_id:1});
          
          callback(undefined,null)
        }
      }
    });

    MW({
      params: {errorid:1}
    },{},
    (err)=>{
      done();
    });
  });

  it('should call next with error if there is a remove error at db', function (done) {

    const testErrorResult= {
      remove:(callback)=>{
        callback('error');
      }
    }
    const MW = deleteErrorMW({
      errorModel:{
        findOne: (param1,callback)=>{
          expect(param1).to.be.eql({_id:1});
          
          callback(undefined,testErrorResult)
        }
      }
    });

    MW({
      params: {errorid:1}
    },{},(err)=>{
      expect(err).to.be.eql('error');
      done();
    });

  });
});