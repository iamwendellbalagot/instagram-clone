import React from 'react';
import './CreatePost.css';

const CreatePost = () => {
    return (
        <div className='createpost'>
            <form className='createpost__form'>
                <textarea type='text' placeholder='Caption...'/>
                <hr />
                <div className='form__controls'>
                    <label className='form__controls__label'>
                        <input type='file' />
                        Upload a photo
                    </label>
                    
                    <button type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;