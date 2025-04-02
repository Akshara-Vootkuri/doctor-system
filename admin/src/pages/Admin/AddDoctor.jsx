import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('! year');
  const [fees, setFees] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [about, setAbout] = useState('');

  const {backendUrl,aToken}=useContext(AdminContext)
   const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      if(!docImg){
        return toast.error('Image not selected')
      }
      const formData=new FormData()
      formData.append('image',docImg);
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('experience',experience);
      formData.append('fees',Number(fees));
      formData.append('about',about);
      formData.append('speciality',speciality);
      formData.append('degree',degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));
      //console log formdata
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })
      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')

      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
      console.log(error)
    }
   }
  return (
    <form onSubmit={onSubmitHandler}className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-16 bg-gray-100 rounded-full"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-500">Upload Doctor Image</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Left and Right Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Side Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <p>Doctor Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="border p-2 rounded w-full" />
              </div>
              <div>
                <p>Doctor Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="border p-2 rounded w-full" />
              </div>
              <div>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="border p-2 rounded w-full" />
              </div>
              <div>
                {/* <p>Experience</p>
                <select onChange={(e) => setExperience(e.target.value)} value={experience} name="experience" required className="border p-2 rounded w-full">
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={`${i + 1} year`}>
                      {i + 1} years
                    </option>
                  ))}
                </select> */}
                <p>Experience</p>
                  <select 
                    onChange={(e) => setExperience(e.target.value)} 
                    value={experience} 
                    name="experience" 
                    required 
                    className="border p-2 rounded w-full"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={`${i + 1} year`}>
                        {i + 1} years
                      </option>
                    ))}
                  </select>
              </div>
              <div>
                <p>Fees</p>
                <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fee" required className="border p-2 rounded w-full" />
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <p>Speciality</p>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} name="speciality" required className="border p-2 rounded w-full">
                  <option value="">Select Speciality</option>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div>
                <p>Education</p>
                <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="border p-2 rounded w-full" />
              </div>
              <div>
                <p>Address</p>
                <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="border p-2 rounded w-full" />
                <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="border p-2 rounded w-full mt-2" />
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="w-full px-4 pt-2 border rounded"
              placeholder="Write about doctor"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

