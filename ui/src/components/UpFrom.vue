<template>
  <v-container center>
    <form>
      <v-text-field
        v-model="stackName"
        :error-messages="nameErrors"
        :counter="10"
        label="Stack Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="projectName"
        :error-messages="emailErrors"
        label="Project Name"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="VPCName"
        :error-messages="emailErrors"
        label="VPC Name"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </v-container>
</template>

<script>
// import { validationMixin } from "vuelidate";
// import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "FormComponent",
  data() {
    return {
      stackName: "",
      projectName: "",
      VPCName: "",
    };
  },
  methods: {
    submit() {
      console.log(this.stackName, this.projectName, this.VPCName);
      fetch(`${process.env.VUE_APP_APIURL}vpc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stackName: this.stackName,
          projectName: this.projectName,
          VPCName: this.projectName,
        }),
      }).then((response) => {
        console.log(response, "this is response");
      });
    },
  },
};
</script>
