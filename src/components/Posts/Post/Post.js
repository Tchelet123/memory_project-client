import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost ,likePost} from '../../../actions/posts.js';
import defPic from '../../../images/def.png';

// import Moment from 'react-moment';

import useStyles from './styles.js';
const Post = ({post, setCurrentId}) => {
    const classes=useStyles();
    // console.log(post);
    const dispatch=useDispatch();
    const user = JSON.parse(localStorage.getItem('profileMemories'));
    
   
    const Likes=()=>{
        if(post.likes.length>0){
            return post.likes.find((like)=>like===(user?.result?.googleId || user?.result?._id))
            ?(
                <><ThumbUpAltIcon fontSize="small"/> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` } </>
            ):(
                <> <ThumbUpAltOutlined fontSize="small"/> &nbsp;{post.likes.length} {post.likes.length ===1 ? 'Like' : 'Likes'}  </>
                )
                
            }
            
            return  <><ThumbUpAltOutlined fontSize="small"/> &nbsp; Like </>
    }

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile?post.selectedFile:defPic} title={post.title?post.title:' '}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).locale( 'he-IL').fromNow()}</Typography>
                {/* <Typography variant="body2"><Moment fromNow>{post.createdAt}</Moment></Typography> */}
                {/* <Typography variant="body2"><Moment fromNow>{post.createdAt}</Moment></Typography> */}

            </div>
            <div className={classes.overlay2}>
            {(post.creator===(user?.result?.googleId || user?.result?._id))&&(
                    <Button style={{color:'white'}} size="small"  onClick={()=>{setCurrentId(post._id)}}>
                    <MoreHorizIcon />
                </Button>
                )}
                
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >{ post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <CardContent  >
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button  size="small" color="primary" disabled={(!user?.result)||((post.creator===(user?.result?.googleId || user?.result?._id)))} onClick={()=>{dispatch(likePost(post._id))}}><Likes/></Button>
                {( post.creator===(user?.result?.googleId || user?.result?._id))&&(
                    <Button  size="small" color="primary"  onClick={()=>{dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
                
            </CardActions>

        </Card>
    );
}

export default Post;