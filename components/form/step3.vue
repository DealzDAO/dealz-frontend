<template>
<div>
    <div class="container">
        <div class="row pt-3">
            <!-- detail view -->
            <div class="col-6">
                <p class="data2">Add questions</p>
                <div class="contract-box w-100 hidden-scroll">
                    <div v-html="updatedDetail" ref="contract" id="container" contenteditable="true" @click="selectWord()"></div>
                </div>
                <p class="data2 mt-4">
                    <b>Step 3:</b> <span class="helper-text">Send for approval</span>
                </p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-5 bg-primary-light" @click="next">
                        <p>Continue</p>
                    </b-button>
                </div>
            </div>
            <!-- end detail view -->

            <div class="col-6">
                <p class="title-text3">Comments and Questions</p>
                <p class="helper-text3" v-if="questions.length == 0">
                    No questions yet
                </p>

                <!-- added question list -->
                <div class="row mt-2" v-for="(item, i) in questions" :key="i">
                    <div>
                        <div class="q-title">
                            <span class="helper-text3 bg-highlight">{{ item.title }}</span>
                        </div>
                        <b-input-group class="p-0">
                            <template #append>
                                <b-input-group-text class="bg-white p-0">
                                    <b-form-select disabled :value="item.type" :options="types" class="adjust-btn"></b-form-select>
                                </b-input-group-text>
                            </template>
                            <b-form-input disabled :value="item.question" class="input-style input-adjust" style="border-top-left-radius:0px" :state="null" placeholder="Question Name"></b-form-input>
                        </b-input-group>
                    </div>

                    <b-button class="ok-btn bg-white ml-2" @click="removeQuestion(item)">
                        <b-icon icon="trash" class="text-primary"></b-icon>
                    </b-button>
                </div>
                <!-- end added question list -->

                <!-- question adding form -->
                <div class="row mt-2" v-if="questioning == true">
                    <div>
                        <div class="q-title">
                            <span class="helper-text3 bg-highlight">{{ selected }}</span>
                        </div>
                        <b-input-group class="p-0">
                            <template #append>
                                <b-input-group-text class="bg-white p-0">
                                    <b-form-select v-model="type" @change="checkType" :options="types" class="adjust-btn"></b-form-select>
                                </b-input-group-text>
                            </template>
                            <b-form-input v-model="question" class="input-style input-adjust" style="border-top-left-radius:0px" :state="null" placeholder="Question Name"></b-form-input>
                        </b-input-group>
                        <span class="helper-text3 text-danger" v-show="warn">{{
                warnText
              }}</span>
                    </div>

                    <b-button class="ok-btn bg-white ml-2" @click="addQuestion">
                        <b-icon icon="check2" class="text-primary"></b-icon>
                    </b-button>
                </div>

                <!-- options -->
                <div class="mt-3" v-if="questioning == true && type == 'Multiple Choice'">
                    <b-input v-for="(item, i) in optionCount" :key="i" v-model="form.option[i]" :placeholder="`option ` + (i + 1)" class="radius10 mb-2 px-5"></b-input>
                    <span class="helper-text3 text-danger" v-show="optionWarn">{{
              warnText
            }}</span>

                    <div class="row no-gutters justify-content-between">
                        <p class="helper-text3 link" @click="addMoreOption">
                            <b-icon icon="plus-circle"></b-icon>
                            Add More Option
                        </p>
                        <p class="helper-text3 link float-right" @click="removeOption">
                            <b-icon icon="archive"></b-icon>
                            Remove Option
                        </p>
                    </div>
                </div>

                <!-- end options -->

                <!-- end question adding form -->

                <div class="mt-3">
                    <b-button class="btn-outlined" @click="saveThirdDraft" :disabled="btnDisabled">
                        <p class="text-primary-light">{{ btnText }}</p>
                    </b-button>
                    <b-button class="my-btn bg-white">
                        <p class="text-danger-light">Continue</p>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            questions: [],
            questioning: false,
            question: null,
            type: null,
            selected: "",
            optionMode: false,
            optionCount: 2,
            optionWarn: false,
            updatedDetail: '',
            form: {
                option: []
            },
            types: [{
                    value: null,
                    text: "Question type",
                    disabled: true
                },
                {
                    value: "Short Answer",
                    text: "Short Answer"
                },
                {
                    value: "Multiple Choice",
                    text: "Multiple Choice"
                },
                {
                    value: "Date",
                    text: "Date"
                }
            ],
            warn: false,
            warnText: "",
            selectedWords: [],
            btnText: "Save Draft",
            btnDisabled: false,
            qCount: 0,
            changingText: ""
        };
    },
    computed: {
        detail() {
            return this.$store.state.lawyer.detail;
        }
    },
    watch: {
        question(newValue, oldValue) {
            if (newValue != null) {
                this.warn = false;
            }
        },
        type(newValue, oldValue) {
            if (newValue != null) {
                this.warn = false;
            }
        },
        form(newValue, oldValue) {
            if (newValue.option.length == this.optionCount) {
                this.optionWarn = false;
            }
        }
    },
    mounted() {
        this.updatedDetail = this.detail
    },
    methods: {
        next() {
            this.$store.commit("lawyer/setQuestions", this.questions);
            this.$store.commit("lawyer/nextStep");
        },
        pasteHtml(html) {
                var sel, range;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();

                        // Range.createContextualFragment() would be useful here but is
                        // only relatively recently standardized and is not supported in
                        // some browsers (IE9, for one)
                        var el = document.createElement("div");
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment(),
                            node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);

                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }

                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            selectWord() {
                    if (this.qCount == this.questions.length) {
                        this.qCount += 1;
                        this.selected = "Question-" + (this.questions.length + 1);
                        let insert = "<span id=" + this.selected + ">" + "{{" + this.selected + "}}" + "</span>"
                        this.questioning = true;
                        this.pasteHtml(insert)
                        // document.execCommand('insertText', true, 'llll')
                        // console.log(this.updatedDetail.indexOf('Question-1'))//gives innerhtml position
                        // var a = this.$el.querySelector("#container").innerText;
                        // this.updatedDetail = [a.slice(0,pos),insert, a.slice(pos)].join('');
                    } else {
                        this.warn = true;
                        this.warnText = "Fill this question first before adding another.";
                    }

                    //this.selected = window.getSelection()
                    // if (this.selected.length > 1) {
                    //     if (!this.selectedWords.includes(this.selected)) {
                    //         document.execCommand('backColor', false, "#ffff00")
                    //         this.questioning = true
                    //         this.selectedWords.push(this.selected)
                    //     } else {
                    //         document.execCommand('backColor', false, "#ffffff")
                    //         this.questioning = false
                    //         this.selectedWords.splice(this.selectedWords.indexOf(this.selected, 1))
                    //         for (var x = 0; x < this.questions.length; x++) {
                    //             if (this.selected == this.questions[x].title) {
                    //                 this.questions.splice(this.questions.indexOf(this.questions[x]), 1)
                    //             }
                    //         }
                    //     }
                    // }
                },
                checkType() {
                    if (this.type == "Multiple Choice") {
                        this.optionMode = true;
                    }
                },
                addMoreOption() {
                    this.optionCount++;
                },
                removeOption() {
                    if (this.optionCount > 2) {
                        this.optionCount--;
                    }
                },
                addQuestion() {
                    if (this.question == null || this.type == null) {
                        if (this.question == null) {
                            this.warnText = "Please type question";
                            this.warn = true;
                        } else if (this.type == null) {
                            this.warnText = "Select question type";
                            this.warn = true;
                        }
                    } else {
                        if (this.type == "Short Answer" || this.type == "Date") {
                            this.questions.push({
                                title: this.selected,
                                type: this.type,
                                question: this.question,
                            });
                            this.selected = "";
                            this.question = null;
                            this.type = null;
                            this.questioning = false;
                            this.optionMode = false;
                            this.optionCount = 2;
                            this.form.option = [];
                        } else if (this.type == "Multiple Choice") {
                            if (this.optionCount == this.form.option.length) {
                                this.questions.push({
                                    title: this.selected,
                                    type: this.type,
                                    question: this.question,
                                    options: this.form.option,
                                });
                                this.selected = "";
                                this.question = null;
                                this.type = null;
                                this.questioning = false;
                                this.optionMode = false;
                                this.optionCount = 2;
                                this.form.option = [];
                            } else {
                                this.warnText = "Plese fill all options";
                                this.optionWarn = true;
                            }
                        }
                        var a = this.$el.querySelector("#container").innerHTML;
                        this.$store.commit('lawyer/setDetail', a)
                    }
                },
                removeQuestion(item) {
                    this.questions.splice(this.questions.indexOf(item), 1);
                },
                saveThirdDraft() {
                    this.btnText = "Saving";
                    this.btnDisabled = true;
                    this.$store.dispatch("lawyer/saveThirdDraft", this.questions);
                },
        }
    };
</script>

<style lang="scss">
.adjust-btn {
    margin: 0px 0px 1px 1px;
    border: none;
    border-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.input-group-text {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border: 1px solid #dfe6ec;
}

.q-title {
    border: 1px solid #dfe6ec;
    padding: 5px 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: inline-block;
}

.input-adjust {
    border-top-left-radius: 0px;
    border-right: 1px solid #dfe6ec;
}

.ok-btn {
    padding: 5px 10px;
    border: 1px solid #04a5f6;
    border-radius: 10px;
    display: inline-block;
    height: 40px;
    margin-top: 35px;
}
</style>
