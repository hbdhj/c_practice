/*

Copyright 2017 <Deng Haijun>

Tutorials > 10 Days of Statistics > Day 0: Mean, Median, and Mode 

Sample Input

10
64630 11735 14216 99233 14470 4978 73429 38120 51135 67060

Sample Output

43900.6
44627.5
4978

*/

#include "./common.h"

int main() {
    int n, xi;
    cin >> n;
    vector<int> xis(n);
    float mean = 0.0;
    for (int i = 0; i < n; i++) {
        cin >> xis[i];
        mean += static_cast<float>(xis[i]) / n;
    }
    printf("%.1f\n", mean);
    sort(xis.begin(), xis.end());
    if (n%2) {
        printf("%.1f\n", static_cast<float>(xis[n/2]));
    } else {
        printf("%.1f\n", static_cast<float>(xis[n/2] + xis[n/2-1])/2);
    }
    int max_freq = 0;
    int freq = 0;
    int min_val = 0;
    int check_val = 0;
    for (int i = 0; i < n; i++) {
        if (xis[i] == check_val) {
            freq++;
        } else {
            freq = 1;
            check_val = xis[i];
        }
        if (freq > max_freq) {
            max_freq = freq;
            min_val = check_val;
        }
    }
    printf("%d\n", min_val);
    return 0;
}
