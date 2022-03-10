import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';

//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function BlogPost(post) {
  console.log(post);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card key={post.id} sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)'
            }
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute'
            }}
          />
          <AvatarStyle
            alt={post.nickname}
            src={`http://localhost:8080/images/profile/${post.profile}`}
            sx={{
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40
            }}
          />
          <CoverImgStyle alt={post.title} src={`http://localhost:8080/images/post/${post.image}`} />
        </CardMediaStyle>
        <CardContent
          sx={{
            pt: 4,
            bottom: 0,
            width: '100%',
            position: 'absolute'
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {post.nickname}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              color: 'black'
            }}
          >
            {post.title}
          </TitleStyle>

          <InfoStyle>
            <Box
              key={post.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 1.5,
                color: 'grey.500'
              }}
            >
              <Iconify sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">{post.nickname}</Typography>
            </Box>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
