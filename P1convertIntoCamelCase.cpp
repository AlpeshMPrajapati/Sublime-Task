#include<iostream>
#include<string>
#include<bits/stdc++.h>
using namespace std;

string convertToCamelCase(string& str){
    int n = str.length();

    str[0] =  tolower(str[0]);

    int index = 0; 

    for(int i = 0; i<n; i++){
        if(str[i] == ' '){
            str[i+1] = toupper(str[i+1]);
        }else{
            str[index++] = str[i]; 
        }
        
    }

    //because we removed space to that's why it attech some character at end so didn't need of that char
    return str.substr(0,index);
    
}


int main(){
    string str;
    getline(cin,str);

    str = convertToCamelCase(str);
    
    cout<<str<<endl;

    return 0;
}