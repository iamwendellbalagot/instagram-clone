import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress'

import './Modal.css';

import {useStateValue} from '../../hoc/stateProvider';
import { auth, storage } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '100px',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [progress, setProgress] = useState(0);
  const [{user, fullname, username}, dispatch] = useStateValue();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let userFullname;
    if (!firstname && !lastname){
        userFullname = fullname;
    }
    else{
        userFullname = firstname + ' ' + lastname;
    }
    auth.onAuthStateChanged(userAuth => {
        userAuth.updateProfile({
            displayName: username + '%20' + userFullname
        })
        .then(res => {
            dispatch({
                type: 'SET_USER',
                user: userAuth
            });
            dispatch({
                type: 'SET_FULLNAME',
                fullname: userFullname
            })
            console.log('User Updated')
        })
        .catch(err => console.log(err.message))
    })
    if(uploadedPhoto){
        let uploadTask = storage.ref(`images/${uploadedPhoto.name}`).put(uploadedPhoto);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                let uploadProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploadProgress)
            },
            (error) =>{
                console.log(error.message)
            },
            () => {
                storage
                .ref('images')
                .child(uploadedPhoto.name)
                .getDownloadURL()
                .then(res => {
                    auth.onAuthStateChanged(userAuth => {
                        userAuth.updateProfile({
                            photoURL: res
                        })
                        .then(res => {
                            dispatch({
                                type: 'SET_USER',
                                user: userAuth
                            })
                            console.log('Updated user photo')
                            setProgress(0);
                            setUploadedPhoto(null);
                        })
                        .catch(err => console.log(err.message))
                    })
                })
            }
        )
    }
  }

  return (
    <div className='modal'>
      <span onClick={handleOpen} >Edit</span>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <div className={classes.paper}>
            <h2 id="spring-modal-title">Spring modal</h2>
            <p id="spring-modal-description">react-spring animates me.</p>
          </div> */}
          <div className={`modal__contents ${classes.paper}`}>
            {/* <h2>Edit Profile</h2> */}
            <div className='modal__contents__left'>
                {!uploadedPhoto?<Avatar src={user?.photoURL} style={{height: '120px', width:'120px'}} >wendell</Avatar>
                :<img
                    src={uploadedPhoto?URL.createObjectURL(uploadedPhoto): ''}
                    alt='Profile' />}
                <LinearProgress variant='determinate' value={progress} style={{width:'100%', margin:'5px auto'}} />
                <label>Upload<input type='file' onChange={(e) => setUploadedPhoto(e.target.files[0])} /></label>
            </div>
            <div className='modal__contents__right'>
                <input 
                    type='text' 
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)} 
                    placeholder='First name' />
                <input 
                    type='text' 
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)} 
                    placeholder='Lastname' />
                <button onClick={handleSubmit} >Save</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}