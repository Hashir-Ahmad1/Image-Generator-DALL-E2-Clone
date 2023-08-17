// CreatePost.jsx
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, FormField, Card } from '../components/Index';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  // Initialize navigation hook for routing
  const navigate = useNavigate();

  // State for form inputs and loading indicators
  const [form, setform] = useState({
    name: '',
    prompt: '',
    img: ''
  });
  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.img) {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter the prompt and generate an image');
    }
  };

  // Function to generate a random prompt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomPrompt });
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  // Function to generate an image using DALL-E API
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setform({ ...form, img: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter the prompt');
    }
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
          <h1 className='font-extrabold text-black text-[32px]'>
              Create Images
          </h1>
          <p className='text-[#666e75] mt-2 text-[16px] max-w[500px]'>
              Create a Imaginative and Visually stunning images through by DALL-E AI and share them to the community
          </p>
      </div> 
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField
              LabelName='Your name'
              type='text'
              placeholder='John Doe'
              name='name'
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              LabelName='Prompt'
              type='text'
              placeholder='an armchair in the shape of an avocado'
              name='prompt'
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 justify-center items-center'>
              {form.img?(
                <img src={form.img} alt={form.prompt} className='w-full h-full object-contain'/>
              ):(
                <img src={preview} alt="preview" className='w-full h-full object-contain opacity-40'/>
              )}
              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgb(0,0,0,0.5)]'>
                <Loader/>
                </div>
              )}
            </div>
            <div className='mt-5 flex gap-5'>
                <button type='button' onClick={generateImage}
                 className='text-white text-center text-sm font-medium rounded-md bg-green-700 px-5 py-2.5 w-full sm:w-auto'>
                  {generatingImg?"Generating...":"Generate"}
                 </button>
            </div>
            <div>
              <p className='mt-2 text-gray-500 text-[14px]'>
                Once you have Created the Images , you can share it with the others in the community.
              </p>
              <button type='submit' 
                 className='mt-3 text-white text-center text-sm font-medium rounded-md bg-blue-600 px-5 py-2.5 w-full sm:w-auto'>
                  {loading?"Sharing...":"Share with the community"}
                 </button>
            </div>
          </div>
        </form> 
    </section>
  )
}

export default CreatePost
