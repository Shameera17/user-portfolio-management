import { model, Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    repositoryUrl: { type: String, required: true },
    demoUrl: { type: String, required: false },
    description: { type: String, required: false },
    projectName: { type: String, required: false },
    code: { type: String, required: false },
    imageUrl: { type: String, required: false, default: null },
    imagePath: { type: String, required: false, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Project = models.Project || model("Project", ProjectSchema);
export default Project;
