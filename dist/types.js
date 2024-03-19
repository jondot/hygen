"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResolutionStrategy = void 0;
var ConflictResolutionStrategy;
(function (ConflictResolutionStrategy) {
    /**
     * Stops the generation and lets the user know
     * that actions are in conflict
     */
    ConflictResolutionStrategy["FAIL"] = "fail";
    /**
     * keeps the action is defined last
     */
    ConflictResolutionStrategy["OVERRIDE"] = "override";
    /**
     * keeps the action that appears first skipping the ones that conflict
     */
    ConflictResolutionStrategy["SKIP"] = "skip";
})(ConflictResolutionStrategy = exports.ConflictResolutionStrategy || (exports.ConflictResolutionStrategy = {}));
