<template>
<div>
        <step1 v-if="step==1"></step1>
        <step2 v-if="step==2"></step2>
        <step3 v-if="step==3"></step3>
        <step4 v-if="step==4"></step4>
</div>
</template>

<script>
import Step1 from '../../components/form/step1';
import Step2 from '../../components/form/step2';
import Step3 from '../../components/form/step3';
import Step4 from '../../components/form/step4';
export default {
    components: {
        Step1,
        Step2,
        Step3,
        Step4
    },
    data() {
        return {

        }
    },
    computed: {
        step() {
            return this.$store.state.lawyer.step
        }
    },
}
</script>
