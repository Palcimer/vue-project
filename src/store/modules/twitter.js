import Vue from "vue";

export const state = () => ({
	code_verifier: '',
    acess_token: '',
});

export const mutations = {
	SET_CODE_VERIFIER(state, verifier) {
        state.code_verifier = verifier;
    },
    SET_ACCESS_TOKEN(state, token) {
        state.acess_token = token;
    },
};

export const getters = {
	
};

export const actions = {

};