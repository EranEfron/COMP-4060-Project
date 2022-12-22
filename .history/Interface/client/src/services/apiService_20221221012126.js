import Api from '@/services/api'

export default {
  updateCar(vin,ownerFirstName,ownerLastName,milage){
    return Api().post('update',{
      vin:vin,
      milage:milage,
      ownerFirstName:ownerFirstName,
      ownerLastName:ownerLastName
    })
  },
  delete_auth(username,target_username){
    return Api().post('delete_auth',{
      username:username+ '\'s record',
      target_username:target_username
    })
  },
  download(filename){
    return Api().post('download',
    {
      filename: filename + '\'s record'
    })
  },
  Authorize(username,identity,Auth_username){
    if (identity != "Patient"){
     return { success: fasle, description: 'You must be a patient to give access'}
    }else{
      return Api().post('authorize_user',{
        username:username + '\'s record',
        Auth_username:Auth_username
      })
    }
  },
  UploadFile(username,identity,file){
    console.log("in api");
    // console.log(Buffer.from(file).toString());
    console.log(typeof file);

    return Api().post('upload_file',{
      username:username+ '\'s record',
      identity:identity,
      file:file
    })
  },
  
  registerUser(name,password,identity,id){
    return Api().post('registerUser',{
      username:name,
      password:password,
      identity:identity,
      id:id
    })
  },
  Login(name,password,identity){
    return Api().post('Login',{
      username:name,
      password:password,
      identity:identity
    })
  },
  addCar(vin,make,model,year,milage,ownerFirstName, ownerLastName){
    return Api().post('addCar', {
      ownerFirstName:ownerFirstName,
      ownerLastName:ownerLastName,
      vin:vin,
      make:make,
      model:model,
      year:year,
      milage,milage
    })
  }, 
  queryCurrent_Auth(username){
    return Api().post('queryCurrent_Auth',{
      username:username+ '\'s record'
    })
  },
  queryByVim(vim) {
    return Api().post('queryByVim', {
      vim:vim
    })
  }
}