import List "mo:base/List";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Types "types";

actor {
      type User = Types.User;
      type TokenInterface = Types.TokenInterface;

    var rewardAmount = 100;
    let tokenCanister = "rrkah-fqaaa-aaaaa-aaaaq-cai";
    let tokenDecimals= 100_000_000;

    stable var users = List.nil<User>();

    public shared ({ caller }) func registerUser(payload : Types.UserPayload) : async Result.Result<User, Text> {
        switch (payload.referrerCode) {
            case (null) {
                let user = _createUser(payload, caller);
                return #ok(user);
            };
            case (?code) {
                let referralUser = List.find<User>(
                    users,
                    func(user : User) : Bool {
                        return user.referralCode == code;
                    },
                );
                switch (referralUser) {
                    case (null) {
                        let user = _createUser(payload, caller);
                        return #ok(user);
                    };
                    case (?_user) {
                        var userRewards = List.fromArray<Types.Reward>(_user.rewards);
                        var userReferrals = List.fromArray<Principal>(_user.referrals);
                        let reward : Types.Reward = {
                            amount = rewardAmount;
                            claimed = false;
                            claimedAt = null;
                            timestamp = Time.now();
                        };
                        userRewards := List.push<Types.Reward>(reward, userRewards);
                        userReferrals := List.push<Principal>(caller, userReferrals);
                        let updatedUser : User = {
                            _user with
                            rewards = List.toArray<Types.Reward>(userRewards);
                            referrals = List.toArray<Principal>(userReferrals);
                        };
                        func updateUser(u : User) : User {
                            if (u.id == _user.id) {
                                return updatedUser;
                            } else {
                                return u;
                            };
                        };
                        users := List.map(users, updateUser);
                       let user = _createUser(payload, caller);
                       return #ok(user);
                    };
                };
            };
        };
    };

    func _createUser(payload : Types.UserPayload, id : Principal) : User {
        let user : User = {
            id = id;
            firstName = payload.firstName;
            lastName = payload.lastName;
            referralCode = payload.referralCode;
            referrals = [];
            rewards = [];
            lastupdated = Time.now();
            email = payload.email;
            createdAt = Time.now();
        };
        users := List.push<User>(user, users);
        return user;
    };

    public shared ({caller}) func updateProfile(payload : Types.UserPayload) : async Result.Result<User, Text> {
        let user = List.find<User>(
            users,
            func(user : User) : Bool {
                return user.id == caller;
            },
        );
        switch (user) {
            case (null) {
                return #err("User not found");
            };
            case (?_user) {
                let updatedUser : User = {
                    _user with
                    firstName = payload.firstName;
                    lastName = payload.lastName;
                    email = payload.email;
                    lastupdated = Time.now();
                };
                func updateUser(u : User) : User {
                    if (u.id == _user.id) {
                        return updatedUser;
                    } else {
                        return u;
                    };
                };
                users := List.map(users, updateUser);
                return #ok(updatedUser);
            };
        };
    };

    public shared query ({ caller }) func getUser() : async Result.Result<User, Text> {
        let user = List.find<User>(
            users,
            func(user : User) : Bool {
                return user.id == caller;
            },
        );
        switch (user) {
            case (null) {
                return #err("User not found");
            };
            case (?_user) {
                return #ok(_user);
            };
        };
    };

    public shared query ({caller}) func getAllUsers() : async [User] {
        assert(Principal.isController(caller));
        return List.toArray<User>(users);
    };

    public shared ({caller}) func redeemRewards(wallet: Principal, amount: Nat) : async Result.Result<(), Text> {
        let user = List.find<User>(
            users,
            func(user : User) : Bool {
                return user.id == caller;
            },
        );
        switch (user) {
            case (null) {
                return #err("User not found");
            };
            case (?_user) {
                let rewardslist = List.fromArray<Types.Reward>(_user.rewards);
                let unclaimedRewards = List.filter<Types.Reward>(
                    rewardslist,
                    func(reward : Types.Reward) : Bool {
                        return reward.claimed == false;
                    },
                );
                let unclaimedSize = List.size<Types.Reward>(unclaimedRewards);
                if (unclaimedSize < amount) {
                    return #err("Insufficient rewards, " # Nat.toText(unclaimedSize) # " rewards available");
                };
                let tobeClaimedRewards = List.take<Types.Reward>(unclaimedRewards, amount);


                return #ok(());
            };
        };
    } ;

    func transferRewards(wallet: Principal, amount: Nat) : async Result.Result<(), Text> {
      let _actor = actor (tokenCanister) : TokenInterface;
      let transferArg : Types.TransferArg = {
          to = { owner = wallet; subaccount = null };
          fee = null;
          memo = null;
          from_subaccount = null;
          created_at_time = null;
          amount = amount * tokenDecimals;
      };
      return #ok(());
    };

};
