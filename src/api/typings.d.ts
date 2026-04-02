declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePagePicture_ = {
    code?: number
    data?: PagePicture_
    message?: string
  }

  type BaseResponsePagePictureVO_ = {
    code?: number
    data?: PagePictureVO_
    message?: string
  }

  type BaseResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
    message?: string
  }

  type BaseResponsePageUserMessage_ = {
    code?: number
    data?: PageUserMessage_
    message?: string
  }

  type BaseResponsePageSpace_ = {
    code?: number
    data?: PageSpace_
    message?: string
  }

  type BaseResponsePageSpaceVO_ = {
    code?: number
    data?: PageSpaceVO_
    message?: string
  }

  type BaseResponseListPictureVO_ = {
    code?: number
    data?: PictureVO[]
    message?: string
  }

  type BaseResponseListSpaceUserVO_ = {
    code?: number
    data?: SpaceUserVO[]
    message?: string
  }

  type BaseResponseListImageSearchResult_ = {
    code?: number
    data?: ImageSearchResult[]
    message?: string
  }

  type BaseResponseSpaceVO_ = {
    code?: number
    data?: SpaceVO
    message?: string
  }

  type BaseResponseListSpaceLevel_ = {
    code?: number
    data?: SpaceLevel[]
    message?: string
  }

  type BaseResponsePicture_ = {
    code?: number
    data?: Picture
    message?: string
  }

  type BaseResponsePictureTagCategory_ = {
    code?: number
    data?: PictureTagCategory
    message?: string
  }

  type BaseResponsePictureVO_ = {
    code?: number
    data?: PictureVO
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type BaseResponseUserVO_ = {
    code?: number
    data?: UserVO
    message?: string
  }

  type DeleteRequest = {
    id?: number
    /** 空间 id，分表时必须传递。公共图库传 0 */
    spaceId?: number | string
  }

  type getPictureByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id?: number | string
    /** spaceId，分表时必须传，团队/私有空间查图需带此参数 */
    spaceId?: number | string
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type LoginUserVO = {
    createTime?: string
    editTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userPhone?: string
    userEmail?: string
    userRole?: string
  }

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVO_ = {
    current?: number
    pages?: number
    records?: PictureVO[]
    size?: number
    total?: number
  }

  type PageUserVO_ = {
    current?: number
    pages?: number
    records?: UserVO[]
    size?: number
    total?: number
  }

  type UserMessage = {
    id?: number
    userId?: number
    title?: string
    content?: string
    bizType?: string
    bizId?: number
    isRead?: number
    createTime?: string
    updateTime?: string
  }

  type PageUserMessage_ = {
    current?: number
    pages?: number
    records?: UserMessage[]
    size?: number
    total?: number
  }

  type UserMessageQueryRequest = {
    current?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    unreadOnly?: boolean
  }

  type UserMessageReadRequest = {
    id?: number
  }

  type PageSpace_ = {
    current?: number
    pages?: number
    records?: Space[]
    size?: number
    total?: number
  }

  type PageSpaceVO_ = {
    current?: number
    pages?: number
    records?: SpaceVO[]
    size?: number
    total?: number
  }

  type Picture = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    picColor?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    aiReviewStatus?: number
    aiReviewMessage?: string
    spaceId?: number
    tags?: string
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    userId?: number
  }

  type PictureEditRequest = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureUploadRequest = {
    fileUrl?: string
    id?: number
    spaceId?: number
  }

  type PictureUploadByBatchRequest = {
    searchText?: string
    count?: number
    namePrefix?: string
    spaceId?: number
  }

  type PictureSearchByColorRequest = {
    picColor?: string
    spaceId?: number
  }

  type PictureQueryRequest = {
    category?: string
    current?: number
    endEditTime?: string
    id?: number
    introduction?: string
    name?: string
    nullSpaceId?: boolean
    pageSize?: number
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    spaceId?: number
    tags?: string[]
  }

  type PictureReviewRequest = {
    id?: number
    spaceId?: number
    reviewStatus?: number
    reviewMessage?: string
    startEditTime?: string
    tags?: string[]
    userId?: number
  }

  type PictureTagCategory = {
    categoryList?: string[]
    popularCategoryList?: string[]
    popularTagList?: string[]
    tagList?: string[]
  }

  type PictureTag = {
    id?: number
    tagName?: string
    usageCount?: number
    sortOrder?: number
    createTime?: string
    updateTime?: string
  }

  type PictureCategory = {
    id?: number
    categoryName?: string
    usageCount?: number
    sortOrder?: number
    createTime?: string
    updateTime?: string
  }

  type PagePictureTag_ = {
    records?: PictureTag[]
    total?: number
    current?: number
    size?: number
  }

  type PagePictureCategory_ = {
    records?: PictureCategory[]
    total?: number
    current?: number
    size?: number
  }

  type BaseResponsePagePictureTag_ = {
    code?: number
    data?: PagePictureTag_
    message?: string
  }

  type BaseResponsePagePictureCategory_ = {
    code?: number
    data?: PagePictureCategory_
    message?: string
  }

  type PictureUpdateRequest = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureVO = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    name?: string
    permissionList?: string[]
    picColor?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewStatus?: number
    reviewMessage?: string
    aiReviewStatus?: number
    aiReviewMessage?: string
    spaceId?: number
    tags?: string[]
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    user?: UserVO
    userId?: number
  }

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string
  }

  type uploadPictureUsingPOSTParams = {
    id?: number
  }

  type User = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userPhone?: string
    userEmail?: string
    userRole?: string
    vipCode?: string
    vipExpireTime?: string
    vipNumber?: number
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userPhone?: string
    userEmail?: string
    userRole?: string
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type SpaceCategoryAnalyzeResponse = {
    category?: string
    count?: number
    totalSize?: number
  }

  type SpaceTagAnalyzeResponse = {
    tag?: string
    count?: number
  }

  type SpaceSizeAnalyzeResponse = {
    sizeRange?: string
    count?: number
  }

  type SpaceUsageAnalyzeResponse = {
    usedSize?: number
    maxSize?: number
    usedCount?: number
    maxCount?: number
    sizeUsageRatio?: number
    countUsageRatio?: number
  }

  type SpaceUserAnalyzeResponse = {
    period?: string
    count?: number
  }

  type Space = {
    id?: number
    spaceName?: string
    spaceLevel?: string
    spaceType?: string
    totalSize?: number
    maxSize?: number
    totalCount?: number
    maxCount?: number
    userId?: number
    createTime?: string
    editTime?: string
  }

  type SpaceQueryRequest = {
    current?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    spaceName?: string
    spaceLevel?: string
    spaceType?: string
    userId?: number
  }

  type SpaceVO = {
    id?: number
    spaceName?: string
    spaceLevel?: string
    spaceType?: string
    totalSize?: number
    maxSize?: number
    totalCount?: number
    maxCount?: number
    userId?: number
    createTime?: string
    editTime?: string
  }

  type SpaceAddRequest = {
    spaceName?: string
    spaceLevel?: string
    spaceType?: number
  }

  type SpaceEditRequest = {
    id?: number
    spaceName?: string
    spaceLevel?: string
  }

  type SpaceLevel = {
    id?: number
    level?: string
    name?: string
    maxSize?: number
    maxCount?: number
  }

  type SpaceUserVO = {
    id?: number
    spaceId?: number
    userId?: number
    spaceRole?: string
    space?: SpaceVO
    user?: UserVO
    createTime?: string
  }

  type PictureSearchByPictureRequest = {
    pictureId?: number | string
  }

  type ImageSearchResult = {
    id?: number
    name?: string
    url?: string
    thumbUrl?: string
    fromUrl?: string
  }

  type SpaceUserAddRequest = {
    spaceId?: number | string
    userId?: number | string
  }

  type SpaceUserEditRequest = {
    id?: number | string
    spaceRole?: string
  }

  type SpaceUserListRequest = {
    spaceId?: number | string
  }

  type getSpaceVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type UserRegisterRequest = {
    checkPassword?: string
    userAccount?: string
    userPassword?: string
    userPhone?: string
    userEmail?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userPhone?: string
    userEmail?: string
    userRole?: string
  }

  /** 当前用户更新个人资料 */
  type UserUpdateMyRequest = {
    userAvatar?: string
    userName?: string
    userProfile?: string
  }

  type UserVO = {
    createTime?: string
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userPhone?: string
    userEmail?: string
    userRole?: string
    vipCode?: string
    vipExpireTime?: string
    vipNumber?: number
  }
}
