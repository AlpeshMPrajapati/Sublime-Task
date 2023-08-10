#include<iostream>
#include<bits/stdc++.h>
using namespace std;

int minJump(vector<int>& arr) {
    int n = arr.size();
    vector<int> jumps(n);

    int i, j;

    if (n == 0 || arr[0] == 0)
        return 0;

    jumps[0] = 0;


    for (i = 1; i < n; i++) {

        jumps[i] = INT_MAX;

        for (j = 0; j < i; j++) {

            if (i <= j + arr[j] && jumps[j] != INT_MAX) {

                jumps[i] = min(jumps[i], jumps[j] + 1);
                break;
            }
        }
    }
    return jumps[n-1];
}


int main(){
    vector<int> arr = {2,3,1,1,4};

    int ans = minJump(arr);

    cout<<"minimum jumps : "<<ans<<endl;

    return 0;
}