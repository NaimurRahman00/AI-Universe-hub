let see = true;
let srt = false;

const AiData = async (toggleData, srtData) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const arrayOfData = data.data.tools;

  if (srtData) {
    let newDatesList = (prev, next) => {
      const prevDate = new Date(prev.published_in);
      const nextDate = new Date(next.published_in);
      const prevTime = prevDate.getTime();
      const nextTime = nextDate.getTime();

      return nextTime - prevTime;
    }

    arrayOfData.sort(newDatesList);
  }

  showData(arrayOfData, toggleData);
}

AiData();

// sort by date 
const sortByDate = () => {
  srt = true;
  AiData(see, srt);
}

// see more button
const seeMore = () => {
  see = false;
  AiData(see, srt);
  // console.log(srt);
  const seeMoreBtn = document.getElementById('see-more-btn');
  seeMoreBtn.classList.add('hidden');
}

const showData = (getArrayOfData, toggleData = true) => {
  const showData = document.getElementById('show-data');
  showData.innerHTML = '';

  if (toggleData) {
    var getArrayOfData = getArrayOfData.slice(0, 6);
  }

  getArrayOfData.forEach(element => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
            <div class="card w-auto bg-base-100 shadow-xl border h-[510px]">
            <figure class="p-4">
            <img
                class="rounded-md h-[200px]"
                src="${element.image}"
                alt="AI Universe component"
            />
            </figure>
            <div class="card-body">
            <h2 class="text-2xl font-bold">Features</h2>
            <ol class="list-decimal ml-4 mb-4">
                <li>Natural language processing</li>
                <li>Contextual understanding</li>
                <li>Text generation</li>
            </ol>
            <hr />
            <div class="flex justify-between items-center mt-4">
                <div>
                <h2 class="text-2xl font-bold">${element.name}</h2>
                <p>${element.published_in}</p>
                </div>
                <div class="card-actions justify-end">
                <button id="open-modal-btn" class="btn btn-circle"  onclick="openModalBtn('${element.id}'); my_modal_5.showModal();">
                    <img src="Frame.png" alt="" />
                </button>
                </div>
            </div>
            </div>
            </div>
        `;
    showData.appendChild(newDiv);

  });

}
let openModalBtn = (clickedCard) => {
  // console.log(clickedCard);
  AiCardData(clickedCard);
}

const AiCardData = async (cardId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${cardId}`);
  const data = await res.json();
  const arrayOfCardData = data.data;

  showCardData(arrayOfCardData);
  // console.log(arrayOfCardData);
}

const showCardData = (arrayOfCardData) => {

  const modalId = document.getElementById('modal-id');
  modalId.innerHTML = '';
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('flex', 'gap-6', 'p-16');
  modalDiv.innerHTML = `
    <div class="bg-[#EB57570D] border-rose-500 card w-full shadow-xl border">
      <div class="card-body">
        <h2 class="card-title">
          ${arrayOfCardData.description}
        </h2>
        <div class="*:bg-white *:flex-1 *:p-4 *:rounded-xl my-6 flex gap-4">
          <span class="text-green-700 font-bold">${arrayOfCardData?.pricing?.[0]?.price || 'Free of costs'}<br/>${arrayOfCardData?.pricing?.[0]?.plan}</span>
          <span class="text-orange-400 font-bold">${arrayOfCardData?.pricing?.[1]?.price || 'Free of costs'}<br/>${arrayOfCardData?.pricing?.[1]?.plan}</span>
          <span class="text-rose-500 font-bold">${arrayOfCardData?.pricing?.[2]?.price || 'Free of costs'}<br/>${arrayOfCardData?.pricing?.[2]?.plan || ''}</span>
        </div>
        <div class="flex justify-between">
          <span>Features</span>
          <span>Features</span>
        </div>
        <div class="flex justify-between *:list-disc text-slate-500">
          <ul class="ml-4">
            <li>Computer Vision</li>
            <li>Computer Vision</li>
            <li>Computer Vision</li>
            <li>Computer Vision</li>
          </ul>
          <ul>
            <li>Computer Vision</li>
            <li>Computer Vision</li>
            <li>Computer Vision</li>
            <li>Computer Vision</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-full bg-base-100 shadow-xl border">
      <figure class="px-10 pt-10">
        <img
          src="${arrayOfCardData.image_link[0]}"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Hi, how are you doing today?</h2>
        <p>I'm doing well, thank you for asking. How can I assist you today?</p>
      </div>
    </div>
    <div class="modal-action absolute rounded-full top-[-3rem] right-[-1.5rem]">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="rounded-full p-0 px-1.5 bg-rose-500 border-none btn"><img src="./cross.png" alt=""></button>
    </form>
  </div>
    `;
  modalId.appendChild(modalDiv);
}
