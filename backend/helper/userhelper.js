import bcrypt from 'bcrypt';

export const hashingfunction=async(password)=>{
  try {

    const saltpassword=10;
    const hashedpassword=await bcrypt.hash(password,saltpassword)
    return hashedpassword
    
  } catch (error) {
    console.log(error)
    
  }
}

export const comparePassword=async(password,hashedpassword)=>{
    try {
        const comparepassword1=await bcrypt.compare(password,hashedpassword)
        return comparepassword1;
        
    } catch (error) {
        console.log(error)
        
    }
   

}