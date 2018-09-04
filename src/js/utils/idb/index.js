import idb from "idb";

const APP_IDB_NAME = "MLFilter";
const APP_IDB_VERSION = 1;
const IMAGE_DATA_OBJECT_STORE_NAME = "image_data";

const idbPromise = idb.open(APP_IDB_NAME, APP_IDB_VERSION, upgradeIdb => {
  upgradeIdb.createObjectStore(IMAGE_DATA_OBJECT_STORE_NAME, {
    keyPath: "date"
  });
});

export function saveImageData(data) {
  return idbPromise.then(db =>
    db
      .transaction(IMAGE_DATA_OBJECT_STORE_NAME, "readwrite")
      .objectStore(IMAGE_DATA_OBJECT_STORE_NAME)
      .put(data)
  );
}

export function getAllImageData() {
  return idbPromise.then(db =>
    db
      .transaction(IMAGE_DATA_OBJECT_STORE_NAME, "readonly")
      .objectStore(IMAGE_DATA_OBJECT_STORE_NAME)
      .getAll()
  );
}
