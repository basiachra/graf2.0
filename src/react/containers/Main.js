import React from "react";

function Main() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-1" id="left">
                    <div id="project">
                        <h2>Project structure</h2>
                    </div>
                    <div id="data">
                        <h2>Data Base view</h2>
                    </div>
                </div>
                <div className="col-2">
                    <div className="search">
                        <h2>search</h2>
                    </div>
                    <div className="tabs">
                        <h2>tabs</h2>
                    </div>
                    <div id="myNetwork"/>
                </div>
                <div className="col-3" id="right">
                    <div id="info">
                        <h2>Current Node info</h2>
                        <h4 id="node-name"/>
                        <p id="info-1"/>
                        <p id="info-2"/>
                    </div>
                    <div id="node-view">
                        <h2>Current Node view</h2>
                        <div id="curr-node"/>
                    </div>
                    <div id="filter">
                        <h2>Filters</h2>
                        <div id="filters"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;