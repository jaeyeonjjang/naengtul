import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddRefrigerator(props) {
    const [open, setOpen] = useState(false);

    const user = {id:1};
    const ingredient = {ingredientId:5};

    const [refrige, setRefrige] = useState({
        user: user,
        ingredient: ingredient,
        quantity: '',
        expireDate: ''
    });

    // 모달 폼 열기
    const handleClickOpen = () => {
        setOpen(true);
    }

    // 모달 폼 닫기
    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setRefrige({
            ...refrige,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        // 저장 로직 구현
        props.addRefrigerator(refrige);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Add Refrigerator</button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Refrigerator</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="아이디" name="userId" value={refrige.user.id} onChange={handleChange} autoFocus/>
                        <TextField label="식품" name="ingredientId" value={refrige.ingredient.ingredientId} onChange={handleChange} autoFocus/>
                        <TextField label="양" name="quantity" value={refrige.quantity} onChange={handleChange} autoFocus/>
                        <TextField label="유통기한" name="expireDate" value={refrige.expireDate} onChange={handleChange} autoFocus/>    
                    </Stack>
                </DialogContent>
                <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Add</button>
                </DialogActions>
            </Dialog>
        </div>                      
    );
}



export default AddRefrigerator