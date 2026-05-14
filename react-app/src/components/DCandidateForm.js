import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import useForm from './useForm';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate';
import { toast } from 'react-toastify';

const styles = theme => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 230
    }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    },
        smMargin: {
        margin: theme.spacing(10)
    }
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const DcandidatesForm = ({classes, ...props}) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        if('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if(fieldValues === values)
        return Object.values(temp).every(x => x === "")
    }
    
    const { 
            values, 
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)
    
    //material-ui select
    const inputLabel = React.useRef(null)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
        {
            const onSuccess = () => {
                resetForm()
                toast.success("Submitted successfully")
            }   
            if(props.currentId == 0)
                props.createDcandidate(values, onSuccess)
            else
                props.updateDcandidate(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if(props.currentId != 0)
            setValues({
                ...props.DcandidateList.find(x => x.id === props.currentId)
            })
            setErrors({})
    },[props.currentId])

    return (
        <form autoComplete="false" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {... (errors.fullName && {error: true, helperText:errors.fullName})}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {... (errors.email && {error: true, helperText:errors.email})}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {... (errors.bloodGroup && {error: true})}
                    >
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            label="Blood Group"
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {... (errors.mobile && {error: true, helperText:errors.mobile})}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        {... (errors.age && {error: true, helperText:errors.age})}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        {... (errors.address && {error: true, helperText:errors.address})}
                    />
                    <div>
                        <Button variant="contained" color="primary" type='submit' className={classes.smMargin}>Submit</Button>
                        <Button variant="contained" className={classes.smMargin} onClick={resetForm}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
            </form>
    );
}

const mapStateToProps = state => ({
    DcandidateList: state.dCandidate.list
})

const mapActionToProps = {
    createDcandidate: actions.create,
    updateDcandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DcandidatesForm));