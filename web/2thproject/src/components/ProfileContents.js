import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import likeIcon from "../images/like.png";
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const ProfileContent = ({img, tag, content, like}) => {
    return (
        <Card sx={{ display: 'flex', width: '23.4375rem' }}>
            <CardMedia
                component="img"
                sx={{ width: 151, padding: 1}}
                image={img}
                alt="사진"
            />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography component="div" variant="p" sx={{width: 200,fontWeight: 'bold'}}>
            {tag}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{width: 200, whiteSpace: 'normal', overflow: 'hidden', 
            textOverflow: 'ellipsis', lineHeight: 1
          }}>
            {content}
          </Typography>
            <Box sx={{display: 'flex'}}>
             <img src = {likeIcon} alt="좋아요 개수" style={{width: 13, height: 12, margin: 'auto'}}/>
            <Typography component="div" variant="p" sx={{width: 200,fontWeight: 'bold', marginLeft: 1}}>
                {like}
          </Typography>
          </Box>
        </CardContent>
    
      </Box>
      
    </Card>
    )
}

export default ProfileContent;