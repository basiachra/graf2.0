export class ProjectProperties {
    constructor(projectName, graphName, pathToData) {
        this.projectName = projectName;
        this.graphName = graphName;
        this.pathToData = pathToData;
    }
    getProjectName(){
        return this.projectName;
    }
    getGraphName(){
       return this.graphName;
    }
    getPathToData(){
       return this.pathToData;
    }
}