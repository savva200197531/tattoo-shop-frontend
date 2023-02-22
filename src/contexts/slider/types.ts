export type Slide = {
  id: number;
  link?: string;
  img_id: number;
}

export type GetSlides = () => Promise<any>

export type CreateSlidePayload = {
  link?: string;
  img_id: number
}

export type CreateSlide = (payload: CreateSlidePayload) => Promise<any>

export type EditSlidePayload = Partial<CreateSlidePayload>

export type EditSlide = (id: number, payload: EditSlidePayload) => Promise<any>

export type DeleteSlide = (id: number) => Promise<any>

export type SliderContextProps = {
  slides: Slide[]
  getSlides: GetSlides
  createSlide: CreateSlide
  editSlide: EditSlide
  deleteSlide: DeleteSlide
}
