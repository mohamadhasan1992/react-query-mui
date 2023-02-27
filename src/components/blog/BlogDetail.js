import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { fetchComments} from '../../utils/fetch-posts';
import { useQuery } from 'react-query';
import CommentList from './CommentList';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen, postId}) {
    const {data} = useQuery(["comments", postId], () => fetchComments(postId))
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CommentList comments={data} />
        </Box>
      </Modal>
    </div>
  );
}