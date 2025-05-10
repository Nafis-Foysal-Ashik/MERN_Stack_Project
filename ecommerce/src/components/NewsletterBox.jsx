import React from 'react'

const NewsletterBox = () => {

    //This is use so that when the submit button is pressed the page does not reload
    const onSubmitHandler = (event) =>{
        event.preventDefault(); //when we submit the form it will prevent from reload
    }

  return (
    <div className='text-center'>
        <p className='text-3xl font-medium text-gray-1000'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ullam nam eum similique ipsum dolorum esse quo pariatur itaque neque deserunt, tempore consequatur error mollitia voluptates officia laudantium corporis doloremque recusandae omnis.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your e-mail' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox