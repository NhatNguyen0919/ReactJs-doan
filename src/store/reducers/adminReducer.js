import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    positions: [],
    roles: [],
    users: [],
    topDoctors: [],
    allDoctor: [],
    doctorInfor: [],
    allScheduleTime: [],
    allRequireData: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let coppyState = { ...state };
            coppyState.genders = action.data;
            coppyState.isLoadingGender = false;
            return {
                ...coppyState,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state

            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state

            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctor = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
            state.allScheduleTime = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequireData = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequireData = [];
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default adminReducer;