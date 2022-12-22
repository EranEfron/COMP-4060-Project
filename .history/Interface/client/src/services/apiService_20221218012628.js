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
  Authorize(username,identity,Auth_username){
    console.log(username,identity,Auth_username)
    if (identity != "Patient"){
     return { success: fasle, description: 'You must be a patient to give access'}
    }else{
      return Api().post('authorize_user',{
        username:username,
        Auth_username:Auth_username
      })
    }
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
  queryByVim(vim) {
    return Api().post('queryByVim', {
      vim:vim
    })
  }
}