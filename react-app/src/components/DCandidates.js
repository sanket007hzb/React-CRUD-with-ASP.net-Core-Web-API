import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/dCandidate';
import DcandidatesForm from "./DCandidateForm";
import { toast } from 'react-toastify';
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Button,
    ButtonGroup
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const styles = () => ({
    root: {
        '& .MuiTableCell-head': {
            fontSize: '1.25rem'
        }
    },
    paper: {
        margin: 16,
        padding: 16
    }
});

const Dcandidates = ({ classes, fetchAllDCandidates,    deleteDCandidate, dCandidateList }) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        fetchAllDCandidates();
    }, [fetchAllDCandidates]); // componentDidMount

    const onDelete = id => {
        if(window.confirm('Are you sure to delete this record ?')) {
            deleteDCandidate(id, () => toast.success("Deleted successfully"))
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={50}>
                <Grid xs={6}>
                    <DcandidatesForm currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
                <Grid xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dCandidateList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary" onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
};

const mapStateToProps = (state) => {
    return {
        dCandidateList: state.dCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Dcandidates));
