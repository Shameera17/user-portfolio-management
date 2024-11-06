import {model, Schema, models} from "mongoose";

const ProjectSchema = new Schema({
    repositoryUrl: {type: String, required: true},
    demoUrl: {type: String, required: false},
    description: {type: String, required: false},
    projectName: {type: String, required: false},
    code: {type: String, required: false},
    avatarUrl: {type: String, required: false, default: null},
    avatarPath: {type: String, required: false, default: null},
});
const Project = models.Project || model("Project", ProjectSchema);
export default Project;
