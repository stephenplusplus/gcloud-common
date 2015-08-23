# Authorization

It's easy to get authorized and start using Google's APIs. You can set your credentials on a global basis as well as on a per-API basis.

## On Google Compute Engine

If you are running this client on Google Compute Engine, we handle authorization for you with no configuration. Just be sure when you [set up the GCE instance][gce-how-to], you add the correct scopes for the APIs you want to access.

  * **All APIs**
    * `https://www.googleapis.com/auth/cloud-platform`

  * **BigQuery**
    * `https://www.googleapis.com/auth/bigquery`
  * **Compute Engine**
    * `https://www.googleapis.com/auth/compute`
  * **Datastore**
    * `https://www.googleapis.com/auth/datastore`
    * `https://www.googleapis.com/auth/userinfo.email`
  * **DNS**
    * `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
  * **Pub/Sub**
    * `https://www.googleapis.com/auth/pubsub`
  * **Search**
    * `https://www.googleapis.com/auth/cloudsearch`
    * `https://www.googleapis.com/auth/userinfo.email`
  * **Storage**
    * `https://www.googleapis.com/auth/devstorage.full_control`

## On Your Own Server

If you are not running this client on Google Compute Engine, you need a Google Developers service account.
  1. Visit the [Google Developers Console][dev-console].

  1. Create a new project or click on an existing project.

  1. Navigate to **APIs & auth** > **APIs** and enable the APIs that your application requires.

    ![Enable the APIs that your application requires][enable-apis]

    *Note: You may need to enable billing in order to use these services.*

    * **BigQuery**
      * BigQuery API
    * **Datastore**
      * Google Cloud Datastore API
    * **Pub/Sub**
      * Google Cloud Pub/Sub
    * **Search**
      * Google Cloud Search API
    * **Storage**
      * Google Cloud Storage
      * Google Cloud Storage JSON API

  1. Navigate to **APIs & auth** > **Credentials**.

    You should see a screen like one of the following.

    ![Create a new service account][create-new-service-account]

    ![Create a new service account With Existing Keys][create-new-service-account-existing-keys]

    Find the "Add credentials" drop down and select "Service account" to be guided through downloading a new JSON key file.

    If you want to re-use an existing service account, you can easily generate a new key file. Just select the account you wish to re-use, and click "Generate new JSON key":

    ![Re-use an existing service account][reuse-service-account]

    The key file you download will be used by this library to authenticate API requests.


[gce-how-to]: https://cloud.google.com/compute/docs/authentication#using
[dev-console]: https://console.developers.google.com/project

[enable-apis]: https://raw.githubusercontent.com/GoogleCloudPlatform/gcloud-common/master/authorization/enable-apis.png

[create-new-service-account]: https://raw.githubusercontent.com/GoogleCloudPlatform/gcloud-common/master/authorization/create-new-service-account.png
[create-new-service-account-existing-keys]: https://raw.githubusercontent.com/GoogleCloudPlatform/gcloud-common/master/authorization/create-new-service-account-existing-keys.png
[reuse-service-account]: https://raw.githubusercontent.com/GoogleCloudPlatform/gcloud-common/master/authorization/reuse-service-account.png
