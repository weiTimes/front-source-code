/**
 *  从后往前遍历，比较两个数组的大小，大的推入
 *  三个指针：len1, len2, len
 * @param {*} nums1
 * @param {*} m
 * @param {*} nums2
 * @param {*} n
 */
var merge = function (nums1, m, nums2, n) {
  var len1 = m - 1;
  var len2 = n - 1;
  var len = m + n - 1;

  while (len1 >= 0 && len2 >= 0) {
    nums1[len--] = nums1[len1] > nums2[len2] ? nums1[len1--] : nums2[len2--];
  }

  for (var i = 0; i < len2 + 1; i++) {
    nums1[i] = nums2[i];
  }

  //   function appendToNum1Before(src, srcIndex, desc, descIndex, length) {
  //     desc.splice(descIndex, length, ...src.slice(srcIndex, length));
  //   }

  //   appendToNum1Before(nums2, 0, nums1, 0, len2 + 1);
};
