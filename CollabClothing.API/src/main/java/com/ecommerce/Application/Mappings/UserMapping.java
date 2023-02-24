package com.ecommerce.Application.Mappings;

import com.ecommerce.Application.Setup.Auth.Model.RegisterRequest;
import com.ecommerce.Entities.User;
import com.ecommerce.Entities.UserRole;
import com.ecommerce.Model.UserModel;

import java.util.Date;
import java.util.List;

public class UserMapping {
    public static User mapToUser(RegisterRequest request, String passwordHash) {
        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordHash);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAddress(request.getAddress());
        user.setDob(request.getDob());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setIsDeleted(false);
        user.setBlock(false);
        user.setEmailVerified(false);
        user.setUserType(1);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        user.setCreatedBy(user.getId());

        return user;
    }

    public static UserModel mapToUserModel(User user) {
        UserModel userModel = new UserModel();
        userModel.setId(user.getId());
        userModel.setUserName(user.getUsername());
        userModel.setFirstName(user.getFirstName());
        userModel.setLastName(user.getLastName());
        userModel.setPasswordHash(user.getPasswordHash());
        userModel.setPhoneNumber(user.getPhoneNumber());
        userModel.setAddress(user.getAddress());
        userModel.setEmail(user.getEmail());
        userModel.setCreatedDate(user.getCreatedDate());
        userModel.setEmailVerified(user.isEmailVerified());
        userModel.setDob(user.getDob());
        userModel.setGender(user.getGender());
        userModel.setBlock(user.isBlock());
        userModel.setUserType(user.getUserType());
        userModel.setLastLogin(user.getLastLogin());
        userModel.setModifiedBy(user.getModifiedBy());
        userModel.setModifiedDate(user.getModifiedDate());
        userModel.setDeleted(user.getIsDeleted());
        userModel.setDeletedBy(user.getDeletedBy());
        userModel.setDeletedDate(user.getDateDeleted());
        userModel.setRole(user.getUser_roles().stream().map(UserRole::getRole).map(role -> role.getName()).findFirst().orElse(null));

        return userModel;
    }

    public static List<UserModel> mapListUserModel(List<User> users) {
        return users.stream().map(UserMapping::mapToUserModel).toList();
    }
}
