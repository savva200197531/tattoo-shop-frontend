export type Slide = {
  id: number;
  title: string;
  description: string;
  bg_color: string;
  img_id: number | null;
}

export type GetSlides = () => Promise<any>

export type CreateSlidePayload = {
  title: string;
  description: string;
  bg_color: string;
  img?: File
}

export type CreateSlide = (payload: CreateSlidePayload) => Promise<any>

export type DeleteSlide = (id: number) => Promise<any>

export type SliderContextProps = {
  slides: Slide[]
  getSlides: GetSlides
  createSlide: CreateSlide
  deleteSlide: DeleteSlide
}
