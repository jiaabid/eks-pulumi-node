const express = require('express');
const app = express();
const path = require('path')
const cors = require("cors")

const pulumi = require('@pulumi/pulumi')
// import { InlineProgramArgs, LocalWorkspace } from "@pulumi/pulumi/automation";
const { InlineProgramArgs, LocalWorkspace } = require("@pulumi/pulumi/automation");
const aws = require('@pulumi/aws');


app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'ui/dist')))

app.post('/vpc', async (req, res) => {
    console.log(req.body)

    const config = new pulumi.Config();

    const argsA = {
        stackName: req.body.stackName,
        projectName: req.body.projectName,
        program: createVpc(req.body.VPCName)
    };
    console.log(LocalWorkspace.name)
    const stackA = await LocalWorkspace.createOrSelectStack(argsA);
    stackA.setConfig('PULUMI_ACCESS_TOKEN', "pul-96d741964eb15d37f32a2d02458ea105e9ee052d")
    console.info("successfully initialized stack");

    console.info("setting up config");

    console.log(await stackA.getAllConfig())
    console.info("config set");

    console.info("refreshing stack...");
    await stackA.refresh({ onOutput: console.info });
    console.info("refresh complete");



    console.info("updating stacks...");
    const upResA = await stackA.up({ onOutput: console.info });
    return res.status(200).json({
        message: "successfully created!"
    })
})



//vpc creation block
const createVpc = async (name) => {
    
    console.info("Creating VPC...");

    const main = new aws.ec2.Vpc(`vpc-${name}`, {
        cidrBlock: "10.0.0.0/16"
    });
    return {
        VpcId: main.id,
    }
}
//start server
app.listen(3000, () => console.log('server started!'))