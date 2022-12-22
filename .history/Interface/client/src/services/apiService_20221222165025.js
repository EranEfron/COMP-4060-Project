import Api from '@/services/api'

export default {
  
  delete_auth(username,target_username){
    return Api().post('delete_auth',{
      username:username+ '\'s record',
      target_username:target_username
    })
  },
  getRecord(username, requestor){
    return Api().post('getRecord',
    {
      filename: username + '\'s record',
      requestor:requestor
    })
  },
  previewFile(filename){
    return Api().post('previewFile',
    {
      filename:filename
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
  UploadFile(patientname, username,identity,file){
    return Api().post('upload_file',{
      patientname: patientname+ '\'s record',
      username:username,
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
  queryUser(username){
    return Api().post('queryUser',{
      username:username
    })
  },
  Login(name,password,identity){
    return Api().post('Login',{
      username:name,
      password:password,
      identity:identity
    })
  },
 
  queryCurrent_Auth(username){
    return Api().post('queryCurrent_Auth',{
      username:username+ '\'s record'
    })
  }
  
}