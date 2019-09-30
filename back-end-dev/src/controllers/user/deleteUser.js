import to from 'await-to-js';
import { User } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';
import sanitize from '../../sanitization';
import {validateId} from '../../validation'


const deleteUser = async (req, res) => {

    const {
        userId
    } = req.params

    //InputValidation
    if (!userId) {
        resError( res , 500 , titles.SEARCH_ERROR , errors.USER_ID_IS_NOT_CORRECT);
        return;
    }
    const userIdValidationError = validateId(userId);
    if(userIdValidationError.length > 0) {
        resError(res, 500, titles.SEARCH_ERROR, userIdValidationError);
        return;
    }
    //Sanitization
    const userIdSanitized = sanitize(userId)

    let err;
    let user;
    let selectedUser;
    let userDetail;

    //user who requested for detail of selected user
    [err, user] = await to(
        User.findOne({
            where: {id:req.user.id}
        }));
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }

    //selected user
    [err, selectedUser] = await to(
        User.findOne({
            where: {id:userId}
        }));
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }

    if(!selectedUser) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.USER_PROFILE_NOT_FOUND);
        return;
    }

    // check that access is denied or not
    if((user.roleId >= selectedUser.roleId)) {
        resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
        return;
    }


    [err] = await to(selectedUser.destroy());
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }

    res.status(200).json({message: 'User Profile is Deleted'});
    return;
};

export default deleteUser;
