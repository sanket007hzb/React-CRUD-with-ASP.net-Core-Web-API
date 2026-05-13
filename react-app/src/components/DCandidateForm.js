import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import useForm from './useForm';

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
    
    const validate = (fieldvalues) => {
        let temp = {}
        if('fullName' in fieldvalues)
            temp.fullName = fieldvalues.fullName ? "" : "This field is required."
        if('mobile' in fieldvalues)
            temp.mobile = fieldvalues.mobile ? "" : "This field is required."
        if('bloodGroup' in fieldvalues)
            temp.bloodGroup = fieldvalues.bloodGroup ? "" : "This field is required."
        if('email' in fieldvalues)
            temp.email = (/$^|.+@.+..+/).test(fieldvalues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if(fieldvalues == values)
        return Object.values(temp).every(x => x === "")
    }
    
    const { 
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange
    } = useForm(initialFieldValues, validate)
    
    //material-ui select
    const inputLabel = React.useRef(null)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate(values))
        {
            window.alert('Validation succeeded!')
        }
    }

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
                        <Button variant="contained" className={classes.smMargin}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
            </form>
    );
}

export default withStyles(styles)(DcandidatesForm);