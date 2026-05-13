import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/dCandidate';
import DcandidatesForm from "./DCandidateForm";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { 
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from "@mui/material";

const styles = () => ({
    root : {
        '& .MuiTableCell-head': {
            fontSize: '1.25rem'
        }
    },
    paper: {
        margin: 16,
        padding: 16
    }
});

const Dcandidates = ({ classes, fetchAllDCandidates, dCandidateList }) => { 
    useEffect(() => {
        fetchAllDCandidates();
    }, [fetchAllDCandidates]); // componentDidMount

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={50}>
                <Grid xs={6}>
                    <DcandidatesForm />
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
                                    dCandidateList.map((record, index)=>{
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
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
        dCandidateList:state.dCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Dcandidates));
