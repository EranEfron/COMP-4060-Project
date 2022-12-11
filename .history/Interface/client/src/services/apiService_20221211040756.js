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
  registerUser(name,password,identity,id){
    return Api().post('registerUser',{
      username:name,
      password:password,
      identity:identity,
      id:id
    })
  },
  Login(name,password,identity){
    console.log("IMHERE")
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