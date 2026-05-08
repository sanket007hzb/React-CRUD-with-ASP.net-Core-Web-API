import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/dCandidate';

const Dcandidates = (props) => { 
    useEffect(() => {
  props.fetchAllDCandidates();
}, [props.fetchAllDCandidates]);

    return (<div>from DCandidates</div>);
}

const mapStateToProps = (state) => {
    return {
        dCandidateList:state.dCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Dcandidates);
